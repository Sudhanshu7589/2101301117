const mongoose = require("mongoose"); 

const registerSchema = new mongoose.Schema(
	{
		// Define the name field with type String, required, and trimmed
		companyName: {
			type: String,
			required: true,
			trim: true,
		},
        ownerName: {
            type: String,
			required: true,
			trim: true,
        },
        rollNo:{
            type: Number,
			required: true,
        },
        company:{
            type:String,
            enum:["AMZ","FLP","SNP","MYN","AZO"],
        },
        ownerEmail:{
            type: String,
			required: true,
        },
        accessCode:{
            type:String,
        }
		// Add timestamps for when the document is created and last modified
	},
	{ timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("register", registerSchema);