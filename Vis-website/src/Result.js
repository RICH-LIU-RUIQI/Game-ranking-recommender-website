import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Colors from './PublicStyle';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#325288',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, link) {
    return { name, link };
}

const rows = [
    createData('Frozen yoghurt', 'xxx'),
    createData('Ice cream sandwich', 'xxx'),
    createData('Eclair', 'xxx'),
    createData('Cupcake', 'xxx'),
    createData('Gingerbread', 'xxx'),
];

const useStyles = makeStyles({
    mainResults: {
        margin: '5 auto',
    },
    table: {
        margin: '10 auto'
    },
});

export default function ResultsTables(props) {
    const classes = useStyles();
    const [stepState, setStepState] = props.step;
    return (
        <div className={classes.mainResults}>
            <h1>Recommended Games</h1>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Game Name</StyledTableCell>
                            <StyledTableCell align="left">Link</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <a>{row.link}</a>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}