import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

import Colors from './PublicStyle';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#325288',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 28,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },

    image: {
            height: '10%',
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
    const [submitItems, setSubmitItems] = props.submit;
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getUrl = '/recommendation?string=';  // the post target

    const filterResults = (d) => {
        const temp = [];
        d.forEach((v) => {
            let flag = false;
            if(submitItems.filters.year) {
                if(v.release_year < submitItems.filters.year) return
            }
            if(submitItems.filters.price) {
                if(parseInt(v.price.slice(1)) > submitItems.filters.price) return
            }
            if(submitItems.filters.labels.length === 0) {
                flag = true
            } else {
                for(let i = 0; i < submitItems.filters.labels.length; i ++) {
                    if(v.language.includes(submitItems.filters.labels[i])) {
                        flag = true
                        break;
                    }
                }
            }

            if(flag) temp.push(v);
        });
    return temp;
    };

    // load data
    useEffect(() => {
            const temp = submitItems.inputGames.join(',' + ' ');
            console.log(getUrl + temp);
            axios.get(getUrl + temp)
                .then((res) => {
                    // console.log("data got:", res.data);
                    // filter the result
                    const temp = filterResults(res.data);
                    if(temp.length > 0) {
                        setResults(res.data);
                        setIsLoading(false);
                    } else {
                        alert('Your filters are too strict... we cannot find games');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert('Please check your input and then submit again');
                })
        }
        , []);

    if (isLoading) {
        return (
            <div className={classes.mainResults}>
                <h1>Recommended Games</h1>
                <h4 style={{textAlign: 'center', color: 'gray'}}>Loading...</h4>
                <div style={{textAlign: 'center', color: 'gray'}} >We are figuring out your taste of game:)</div>
            </div>
        );
    }

    return (
        <div className={classes.mainResults}>
            <h1>Recommended Games</h1>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell> </StyledTableCell>
                            <StyledTableCell>Game Name</StyledTableCell>
                            <StyledTableCell align="left">Link</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row, id) => (
                            <StyledTableRow key={id}>
                                <StyledTableCell align="left">
                                    <img style={{height: "10%"}} src={row.header_image}/>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <a href={'https://store.steampowered.com/app/' + row.appid.toString()} >Learn more</a>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}