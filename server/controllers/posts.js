import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    const {page} = req.query;

    try {
        const LIMIT = 8; //페이지당 포스트 개수제한
        const startIndex = (Number(page) - 1) * LIMIT; 
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex); //가장최신 포스트가 먼저 오도록, 2페이지 이상 갈때 첫번째 페이지 스킵하도록(랜더링 부하방지)
                
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Query -> /posts?page=1 -> page = 1 데이터를 찾을때 주로 쿼리를 쓰고
// Params -> /posts/123 -> id = 123 파라미터는 데이터를 가져올때 주로 씀

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags} = req.query;

    try {
        const title = new RegExp(searchQuery, 'i'); //대소문자 구분 무시, 현재 postName과 tags 동시에 입력해서 검색하면 태그 우선 검색이 되고, postName은 무시되는 버그가 있음.

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] }); //title이나 tag 중 하나를 찾는

        res.json({ data: posts }); 
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    // const { title, message, selectedFile, creator, tags } = req.body;
    // const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags });
    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: 'No authentication!'})//middleware-auth로 부터 받은 userId

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) { //좋아요 싫어요 
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

export const commentDelete = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "comment deleted successfully." });
}


export default router;