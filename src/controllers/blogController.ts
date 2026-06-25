import { Request, Response } from 'express';
import BlogList from '../models/blogList';
import fs from 'fs';
import path from 'path';

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, shortDetails, date, author, category } = req.body;
    let image = '';

    if ((req as any).file) {
      image = `/uploads/blogs/${(req as any).file.filename}`;
    } else {
      res.status(400).json({ success: false, message: 'Image is required' });
      return;
    }

    const newBlog = new BlogList({
      title,
      shortDetails,
      date,
      author,
      category,
      image
    });

    await newBlog.save();
    res.status(201).json({ success: true, message: 'Blog added successfully', data: newBlog });
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({ success: false, message: 'Failed to add blog', error });
  }
};

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await BlogList.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs', error });
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await BlogList.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blog', error });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await BlogList.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    const { title, shortDetails, date, author, category } = req.body;
    
    blog.title = title || blog.title;
    blog.shortDetails = shortDetails || blog.shortDetails;
    blog.date = date || blog.date;
    blog.author = author || blog.author;
    blog.category = category || blog.category;

    if ((req as any).file) {
      if (blog.image) {
        const filePath = path.join(__dirname, '../../', blog.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      blog.image = `/uploads/blogs/${(req as any).file.filename}`;
    }

    await blog.save();
    res.status(200).json({ success: true, message: 'Blog updated successfully', data: blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ success: false, message: 'Failed to update blog', error });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await BlogList.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    if (blog.image) {
      const filePath = path.join(__dirname, '../../', blog.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await BlogList.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ success: false, message: 'Failed to delete blog', error });
  }
};
