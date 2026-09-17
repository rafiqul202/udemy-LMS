import express from "express";
import multer from "multer";
import { deleteMediaFromCloudinary, uploadMediaToCloudinary } from "../../helpers/cloudinary.js";
const router = express.Router();

const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.single("file"), async (req,res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({success:true,data:result})
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"error cloudinary uploading file"})
  }
})

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ success: false, message: "Asset id is required!" })
    };
    await deleteMediaFromCloudinary(id);
    res.status(200).json({ success: true, message: "Asset deleted successfully form cloudinary!" })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "error cloudinary deleting file" })
  }
});

router.post("/bulk-upload", upload.array("files", 10), async (req,res) => {
  try {
    const uploadPromise = req.files.map((fileItem) => uploadMediaToCloudinary(fileItem.path));
    const data = await Promise.all(uploadPromise);
    res.status(200).json({success:true,message:"bulk upload files upload successful",data:data})
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"error in bulk uploading files"})
  }
})
export default router;