// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next/types";
import { MoviesApiResponse } from "../../types";

const movies = async (req: NextApiRequest, res: NextApiResponse<MoviesApiResponse>) => {
    try {
        const { page } = req.body;
        const result = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=ea5682b7085c1cac426343d4f7439d7c&language=en-US&page=${page}`
        );
        return res.status(200).json({
            data: { ...result.data },
        });
    } catch (e) {
        return res.status(500).json({
            message: "Something went wrong",
            error: e,
        });
    }
};
export default movies;
