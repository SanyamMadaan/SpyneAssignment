const express=require('express');
const router=express.Router();
const {z} =require('zod');
const {Car}=require('../db/Schema');

const CarSchemaValidation=z.object({
    title:z.string(),
    price:z.number(),
    description:z.string(),
    images:z.array(z.string()).max(10),
    tags:z.array(z.string())
})

router.post('/createProduct',async(req,res)=>{
    const validation=CarSchemaValidation.safeParse(req.body);

    if(!validation.success){
        return res.status(400).json(validation.error.issues);
    }

    try{
        const car=await Car.create(req.body);
        return res.status(200).json({message:'Product created successfully'});
    }catch(error){
        return res.status(500).json({message:'Internal server error'+error});
    }
})

router.get('/listProducts',async(req,res)=>{
    try{
        const Allcars=await Car.find({});
        return res.status(200).json({Allcars});
    }catch(error){
        return res.status(500).json({messgae:'Error while searching through Database'});
    }    
})


router.get('/listProduct/:id',async(req,res)=>{
    const CarId=req.params.id;

    try{
        const car=await Car.findById(CarId);
        if(!car){
            return res.status(400).json({msg:'No Such Car Found'});
        }
        return res.status(200).json({car});
    }catch(error){
        return res.status(500).json({message:'Server Error'})
    }
})

router.put('/updateProduct/:id',async(req,res)=>{
    const validation=CarSchemaValidation.safeParse(req.body);
    const CarId=req.params.id;
    if(!validation.success){
        return res.status(400).json(validation.error.issues);
    }
    try{
        const car=await Car.findByIdAndUpdate(CarId,req.body,{new:true});
        if(!car){
            return res.status(400).json({msg:'No Such Car Found'});
        }
        return res.status(200).json({message:'Car Edited Successfully'});
    }
    catch(error){
        return res.status(500).json({message:'Internal Server Error'});
    }
})

router.delete('/deleteProduct/:id',async(req,res)=>{
    try{
    const CarId=req.params.id;
    const response=await Car.findByIdAndDelete(CarId);
    if(!response){
        return res.status(400).json({message:'No Such Car Found'});
    }
    return res.status(200).json({message:'Car deleted successfully'})
    }
     catch(error){
    return res.status(500).json({message:'Server Error'+error})
}
})

module.exports=router;