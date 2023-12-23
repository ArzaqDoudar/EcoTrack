
import { getAllEducationalResourcesModel ,getEducationalResourceByTypeModel,EDUCATIONAL_RESOURCE_CODES } from '../models/educationalresources.model.js'; // Replace with the actual path to your model

export const getAllEducationalResources = async (req, res, next) => {
    try {
        const resources = await getAllEducationalResourcesModel(); 
        //console.log(resources);
        res.status(200).send(resources);
    } catch (err) {
        switch (err) {
            case EDUCATIONAL_RESOURCE_CODES.RESOURCE_TABLE_EMPTY:
                res.status(400).send({
                    message: 'There are no educational resources in the system.',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'Internal server error',
                    status: 500
                });
        }
    }
};

export const getEducationalResourceByType = async (req, res, next) => {
    const payload = {
        resource_type: req.body.resource_type,
    };

    try {
        const resources = await getEducationalResourceByTypeModel(payload);
        console.log(resources);
        res.status(200).send(resources);
    } catch (err) {
        switch (err) {
            case EDUCATIONAL_RESOURCE_CODES.RESOURCE_NOT_FOUND:
                res.status(400).send({
                    message: 'No resources found for the specified type.',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'Internal server error',
                    status: 500
                });
        }
    }
};
//hi

