import express from "express"
import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import {getReceiverSocketId, io} from "../lib/utils/socket.js";
export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filterUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        res.status(200).json(filterUsers)

        
    } catch (error) {
        console.error("getUsersForSidebar error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

}

export const getMessages = async(req, res) => {
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId:senderId, receiverId: userToChatId},
                {senderId:userToChatId, receiverId: senderId},

            ]
        })
        res.status(200).json(messages)

        
    } catch (error) {
        console.error("getMessages error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

}


export const sendMessage = async(req, res) => {
    try {
        const {text, image} = req.body
        const {id:receiverId} = req.params
        const senderId = req.user._id
        let imageUrl;
        if (image) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            } catch (error) {
                console.error("Cloudinary upload error:", error.message);
                return res.status(500).json({ message: "Image upload failed", error: error.message });
            }
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })
        console.log("Saving message:", newMessage);
        await newMessage.save()
        const receiverSocketId = getReceiverSocketId(receiverId);
        console.log("Receiver Socket ID:", receiverSocketId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json(newMessage)

    } catch (error) {
        console.error("sendMessage error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

}