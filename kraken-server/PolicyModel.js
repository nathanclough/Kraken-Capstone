const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema(
	{
		policyId: {type: String, required: true},
        mintTx: {type: String, required: true}
	},
	{ collection: 'Policy' }
)

PolicySchema.index({ slug: 1, userid: 1 }, { unique: true })

const PolicyModel = mongoose.model('Policy', PolicySchema)
module.exports = PolicyModel