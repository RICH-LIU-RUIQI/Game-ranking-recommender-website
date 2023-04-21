import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Slider, TextField} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

import './styles/Filter.css'
import Button from "@material-ui/core/Button";

const useStylesChips = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

function ChipsArray(props) {
    const classes = useStylesChips();
    const [chipData, setChipData] = props.chips;

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <Paper component="ul" className={classes.root}>
            {chipData.map((data) => {
                let icon;

                if (data.label === 'React') {
                    icon = <TagFacesIcon />;
                }

                return (
                    <li key={data.key}>
                        <Chip
                            icon={icon}
                            label={data.label}
                            onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                            className={classes.chip}
                        />
                    </li>
                );
            })}
        </Paper>
    );
}

export default function ControlledAccordions(props) {
    const [stepState, setStepState] = props.step;
    const [submitItems, setSubmitItems] = props.submit;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [price, setPrice] = React.useState(10);
    const [year, setYear] = React.useState(2000);
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'English' },
        { key: 1, label: 'French' },
        { key: 2, label: 'Spanish' },
        { key: 3, label: 'Chinese' },
        { key: 4, label: 'Arabic ' },
        { key: 5, label: 'German' },
        { key: 6, label: 'Russian' },
        { key: 7, label: 'Portuguese' },
    ]);


    const handlePrice = (event, newValue) => {
        setPrice(parseInt(newValue));
    };
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleSubmit = () => {
        let submitLabels = [];
        chipData.forEach((value) => {
            submitLabels.push(value.label)
        });
        setSubmitItems({
            inputGames: submitItems.inputGames,
            filters: {
                price: price,
                year: year,
                labels: submitLabels,
            },
        });
        setStepState(stepState+1);
    };

    return (
        <div className='main-filters'>
            <h1>Game Filter</h1>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className='accordion'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Price $</Typography>
                    <Typography className={classes.secondaryHeading}>Filter games less than</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Slider value={price}
                            onChange={handlePrice}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            max={200}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className='accordion'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Publish Year</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Filter games whose publish year is later than
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        label='Year'
                        variant='outlined'
                        onChange={(e) => {
                            setYear(parseInt(e.target.value))
                        }}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className='accordion'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>Language</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Filter games by language
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ChipsArray chips={[chipData, setChipData]}/>
                </AccordionDetails>
            </Accordion >
            <Button variant="contained" style={{marginTop: 10}} onClick={handleSubmit}>Submit</Button>
        </div>
    );
}