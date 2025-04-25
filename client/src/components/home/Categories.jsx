import {
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    styled,
    Box,
    Typography,
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

const SidebarContainer = styled(Box)`
    max-width: 300px;
    background: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 0 auto;
    margin-top: 40px;
    @media (max-width: 1024px) {
        width: auto;
        box-shadow: none;
        background: transparent;
        padding: 0;
    }
`;

const StyledButton = styled(Button)`
    width: 100%;
    background: linear-gradient(90deg, #6495ed, #4169e1);
    color: #fff;
    font-weight: bold;
    text-transform: none;
    margin-bottom: 20px;
    &:hover {
        background: linear-gradient(90deg, #4169e1, #6495ed);
        box-shadow: 0px 4px 10px rgba(100, 149, 237, 0.5);
    }
`;

const StyledTable = styled(Table)`
    width: 100%;
    border-collapse: collapse;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #333;
    font-size: 16px;
    font-weight: 500;
    &:hover {
        color: #6495ed;
        text-decoration: underline;
    }
`;

const CategoryHeader = styled(Typography)`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <SidebarContainer>
            <CategoryHeader>Blog Categories</CategoryHeader>
            <Link
                to={`/create?category=${category || ''}`}
                style={{ textDecoration: 'none' }}
            >
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to="/">All Categories</StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>
                                <StyledLink to={`/?category=${category.type}`}>
                                    {category.type}
                                </StyledLink>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </SidebarContainer>
    );
};

export default Categories;
