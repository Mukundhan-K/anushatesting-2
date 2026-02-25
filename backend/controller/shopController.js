const path = require("path");
const projDb = require(path.join(__dirname,"..","model","project.js"));
const {throwError} = require(path.join(__dirname, "..", "middleware", "errorMiddleware.js"))

// ==============================================
// list products =================================

// route - get - api/shop/list
// access - private -

const listProject = async(req,res,next)=>{
    try {
        const {
            page = 1,
            limit = 12,
            sortBy = "createdAt",
            sortOrder = "desc",
            search = "",
            status,
            projectType,
            minArea,
            maxArea,
            location
        } = req.body || {};

        const filter = {};
        if (status) filter.status = status;
        if (projectType) filter.projectType = projectType;
        if (location) filter.location = location;
        if (minArea || maxArea) {
            filter.projectArea = {};
            if (minArea) filter.projectArea.$gte = Number(minArea);
            if (maxArea) filter.projectArea.$lte = Number(maxArea);
        }
        if (search && String(search).trim().length > 0) {
            filter.$text = { $search: String(search).trim() };
        }

        const pageNum = Math.max(1, parseInt(page));
        const perPage = Math.min(100, Math.max(1, parseInt(limit)));
        const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

        const projection = {
            title: 1,
            status: 1,
            projectType: 1,
            location: 1,
            projectArea: 1,
            numberOfFloors: 1,
            priceRange: 1,
            createdAt: 1,
            images: { $slice: 1 }
        };

        const [total, projects] = await Promise.all([
            projDb.countDocuments(filter),
            projDb
                .find(filter, projection)
                .sort(sort)
                .skip((pageNum - 1) * perPage)
                .limit(perPage)
                .lean()
        ]);

        return res.status(200).json({
            success: true,
            message: "list of projects",
            projects,
            page: pageNum,
            limit: perPage,
            total,
            pages: Math.ceil(total / perPage)
        });
    } catch (error) {
        next(error); 
    };
};

// ==============================================
// single products =================================

// route - get - api/shop/singleProject
// access - private -

const singleProject = async(req,res,next)=>{
    try {
       
        const projID = req.params.id;
        
        const project = await projDb.findById(projID);
        if (!project) {
            throwError("project not removed", 401);
        };
        return res.status(200).json({
            success : true,
            project
        });

    } catch (error) {
       next(error);
    }
};
// ==========================================================

module.exports = { listProject, singleProject };
