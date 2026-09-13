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

export default router;