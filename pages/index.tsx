import axios from "axios";
import { useState } from "react";
import { HomePageProps } from "../types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const getServerSideProps = async () => {
    const result = await axios.post("http://localhost:3000/api/movies", { page: 1 });
    console.log(result);
    return {
        props: { data: result.data },
    };
};

const Home = ({ data }: HomePageProps) => {
    const [page, setPage] = useState(1);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Language</TableCell>
                        <TableCell align="right">Release Date</TableCell>
                        <TableCell align="right">Popularity</TableCell>
                        <TableCell align="right">Adult</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data?.results?.map((row) => (
                        <TableRow
                            key={row.original_title}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell scope="row">{row.original_title}</TableCell>
                            <TableCell align="right">{row.original_language}</TableCell>
                            <TableCell align="right">{row.release_date}</TableCell>
                            <TableCell align="right">{row.popularity}</TableCell>
                            <TableCell align="right">{row.adult ? "Yes" : "No"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Home;
