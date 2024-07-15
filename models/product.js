const mongoose = require("mongoose"); 

const productSchema = new mongoose.Schema(
	{
		// Define the name field with type String, required, and trimmed
		productName: {
			type: String,
			trim: true,
		},
        price:{
            type: Number,
			//required: true,
        },
        rating:{
            type:Number,
        },
        discount:{
            type: Number,
			//required: true,
        },
        availability:{
            type:String,
            enum:["in-stock","out-of-stock"],
        }
		// Add timestamps for when the document is created and last modified
	},
	{ timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("product", productSchema);