import { Request, Response } from 'express';
import BlogList from '../models/blogList';
import fs from 'fs';
import path from 'path';

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title, shortDetails, date, author, category,
      metaTitle, metaDescription, focusKeyword, metaKeywords, canonicalUrl,
      subtitle, slug, gemstoneName, status,
      introduction, whatIsGemstone, astrologicalImportance, associatedPlanet, whoShouldWear,
      benefits, recommendedMetal, recommendedFinger, recommendedDayTime, mantraPujaProcess,
      naturalVsTreated, priceGuide, buyingGuide, careMaintenance, commonMyths, conclusion,
      faqs
    } = req.body;

    const files = (req as any).files || {};
    let image = '';
    let ogImage = req.body.ogImage || '';

    if (files.image && files.image[0]) {
      image = `/uploads/blogs/${files.image[0].filename}`;
    } else if ((req as any).file) {
      image = `/uploads/blogs/${(req as any).file.filename}`;
    } else {
      res.status(400).json({ success: false, message: 'Image is required' });
      return;
    }

    if (files.ogImage && files.ogImage[0]) {
      ogImage = `/uploads/blogs/${files.ogImage[0].filename}`;
    }

    let parsedFaqs = [];
    if (faqs) {
      try {
        parsedFaqs = typeof faqs === 'string' ? JSON.parse(faqs) : faqs;
      } catch (e) {
        console.error('Error parsing FAQs:', e);
      }
    }

    const newBlog = new BlogList({
      title, shortDetails, date, author, category, image,
      metaTitle, metaDescription, focusKeyword, metaKeywords, canonicalUrl, ogImage,
      subtitle, slug, gemstoneName, status: status || 'Publish',
      introduction, whatIsGemstone, astrologicalImportance, associatedPlanet, whoShouldWear,
      benefits, recommendedMetal, recommendedFinger, recommendedDayTime, mantraPujaProcess,
      naturalVsTreated, priceGuide, buyingGuide, careMaintenance, commonMyths, conclusion,
      faqs: parsedFaqs
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

    const {
      title, shortDetails, date, author, category,
      metaTitle, metaDescription, focusKeyword, metaKeywords, canonicalUrl,
      subtitle, slug, gemstoneName, status,
      introduction, whatIsGemstone, astrologicalImportance, associatedPlanet, whoShouldWear,
      benefits, recommendedMetal, recommendedFinger, recommendedDayTime, mantraPujaProcess,
      naturalVsTreated, priceGuide, buyingGuide, careMaintenance, commonMyths, conclusion,
      faqs
    } = req.body;
    
    if (title !== undefined) blog.title = title;
    if (shortDetails !== undefined) blog.shortDetails = shortDetails;
    if (date !== undefined) blog.date = date;
    if (author !== undefined) blog.author = author;
    if (category !== undefined) blog.category = category;

    if (metaTitle !== undefined) blog.metaTitle = metaTitle;
    if (metaDescription !== undefined) blog.metaDescription = metaDescription;
    if (focusKeyword !== undefined) blog.focusKeyword = focusKeyword;
    if (metaKeywords !== undefined) blog.metaKeywords = metaKeywords;
    if (canonicalUrl !== undefined) blog.canonicalUrl = canonicalUrl;

    if (subtitle !== undefined) blog.subtitle = subtitle;
    if (slug !== undefined) blog.slug = slug;
    if (gemstoneName !== undefined) blog.gemstoneName = gemstoneName;
    if (status !== undefined) blog.status = status;

    if (introduction !== undefined) blog.introduction = introduction;
    if (whatIsGemstone !== undefined) blog.whatIsGemstone = whatIsGemstone;
    if (astrologicalImportance !== undefined) blog.astrologicalImportance = astrologicalImportance;
    if (associatedPlanet !== undefined) blog.associatedPlanet = associatedPlanet;
    if (whoShouldWear !== undefined) blog.whoShouldWear = whoShouldWear;
    if (benefits !== undefined) blog.benefits = benefits;
    if (recommendedMetal !== undefined) blog.recommendedMetal = recommendedMetal;
    if (recommendedFinger !== undefined) blog.recommendedFinger = recommendedFinger;
    if (recommendedDayTime !== undefined) blog.recommendedDayTime = recommendedDayTime;
    if (mantraPujaProcess !== undefined) blog.mantraPujaProcess = mantraPujaProcess;
    if (naturalVsTreated !== undefined) blog.naturalVsTreated = naturalVsTreated;
    if (priceGuide !== undefined) blog.priceGuide = priceGuide;
    if (buyingGuide !== undefined) blog.buyingGuide = buyingGuide;
    if (careMaintenance !== undefined) blog.careMaintenance = careMaintenance;
    if (commonMyths !== undefined) blog.commonMyths = commonMyths;
    if (conclusion !== undefined) blog.conclusion = conclusion;

    if (faqs !== undefined) {
      try {
        blog.faqs = typeof faqs === 'string' ? JSON.parse(faqs) : faqs;
      } catch (e) {
        console.error('Error parsing FAQs:', e);
      }
    }

    const files = (req as any).files || {};
    if (files.image && files.image[0]) {
      if (blog.image) {
        const filePath = path.join(__dirname, '../../', blog.image);
        if (fs.existsSync(filePath)) {
          try { fs.unlinkSync(filePath); } catch (e) {}
        }
      }
      blog.image = `/uploads/blogs/${files.image[0].filename}`;
    } else if ((req as any).file) {
      if (blog.image) {
        const filePath = path.join(__dirname, '../../', blog.image);
        if (fs.existsSync(filePath)) {
          try { fs.unlinkSync(filePath); } catch (e) {}
        }
      }
      blog.image = `/uploads/blogs/${(req as any).file.filename}`;
    }

    if (files.ogImage && files.ogImage[0]) {
      if (blog.ogImage && blog.ogImage.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '../../', blog.ogImage);
        if (fs.existsSync(filePath)) {
          try { fs.unlinkSync(filePath); } catch (e) {}
        }
      }
      blog.ogImage = `/uploads/blogs/${files.ogImage[0].filename}`;
    } else if (req.body.ogImage !== undefined && typeof req.body.ogImage === 'string') {
      blog.ogImage = req.body.ogImage;
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
        try { fs.unlinkSync(filePath); } catch (e) {}
      }
    }

    if (blog.ogImage && blog.ogImage.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../../', blog.ogImage);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) {}
      }
    }

    await BlogList.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ success: false, message: 'Failed to delete blog', error });
  }
};
