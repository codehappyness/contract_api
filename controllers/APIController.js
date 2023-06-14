const SmartContractDAO = require('../data/SmartContractDAO');
const helper = require('./helper');

exports.withdraw = async function withdraw(req, res) {
	try {
		let { address, amount } = req.body;
		if (address === undefined || amount === undefined || amount <= 0) {
			return res.status(400).json(helper.APIReturn(101, "bad request"));
		}
		console.log("call smart contract");
		let dao = new SmartContractDAO();
		let trans = await dao.withdraw(address, amount);
		console.log(trans);
		return res.status(200).json(helper.APIReturn(0, {
			"to": address,
			"amount": amount,
			"txHash": trans,
		}, "success"));
	} catch (error) {
		console.log(error);
		return res.status(500).json(helper.APIReturn(101, "something is wrong"));
	}
}
