import { Request, Response } from "express";
import Lead from "../models/Lead";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      search,
      status,
      source,
      page = "1",
      limit = "10",
      sort = "latest"
    } = req.query;

    const query: any = {};

    // SEARCH
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // FILTER BY STATUS
    if (status) {
      query.status = status;
    }

    // FILTER BY SOURCE
    if (source) {
      query.source = source;
    }

    const pageNumber = parseInt(page as string);

    const limitNumber = parseInt(limit as string);

    const skip =
      (pageNumber - 1) * limitNumber;

    const sortOption =
      sort === "oldest"
        ? 1
        : -1;

    const leads = await Lead.find(query)
      .skip(skip)
      .limit(limitNumber)
      .sort({
        createdAt: sortOption,
      });

    const totalLeads =
      await Lead.countDocuments(query);

    res.status(200).json({
      totalLeads,
      currentPage: pageNumber,
      totalPages: Math.ceil(
        totalLeads / limitNumber
      ),
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "Lead updated successfully",
      updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(
      req.params.id
    );

    if (!deletedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
