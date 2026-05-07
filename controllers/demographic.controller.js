import getRandomMuser from '../services/httpRequest.js';

const getDemographicData = async (req, res) => {
    const {result} = req.params;
    if (isNaN(result) || result < 1000 || result > 15000) {
        return res.status(400).json({
            error: "results must be between 1000 and 15000"
        });
    }
    const response = await getRandomMuser(result);
    res.status(200).json({message: response});
};

export default getDemographicData;