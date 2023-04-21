import React from "react";
import PropTypes from "prop-types";
import {Box, Card, CardContent, CardHeader, CardMedia, makeStyles, Typography} from "@material-ui/core";
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';

import "./styles/InfoBox.css";

function InfoBox({ game, rank, click }) {

  const useStyles = makeStyles(() => ({
    card: ({ color }) => ({
      width: 256,
      borderRadius: 16,
      boxShadow: 'none',
      height: '100%',
    }),
    content: ({ color }) => {
      return {
        backgroundColor: color,
        padding: '1rem 1.5rem 1.5rem',
      };
    },
    title: {
      fontFamily: 'Keania One',
      fontSize: '1.5rem',
      color: '#fff',
      textTransform: 'uppercase',
      overflow:'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    subtitle: {
      fontFamily: 'Montserrat',
      color: '#fff',
      opacity: 0.87,
      marginTop: '2rem',
      fontWeight: 500,
      fontSize: 14,
    },
    rank: {
      fontFamily: "serif",
      color: '#c2bdbd',
      textTransform: 'uppercase',
    }
  }));
  const classes = useStyles({ color: '#58707b' });
  const mediaStyles = useFourThreeCardMediaStyles();
  const arrCate = game.categories.split(" ").slice(0, 3).join(', ');

  return (
      <Card className={classes.card} >
        <div>
          <CardMedia classes={mediaStyles} image={game.header_image} onClick={() => {click(game)}}/>
        </div>
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h2'}>
            {game.name}
          </Typography>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography className={classes.subtitle}>{arrCate}</Typography>
            <span></span>
            <Typography variant={'h3'} className={classes.rank}>{rank}</Typography>
          </div>

        </CardContent>
      </Card>
  );
}

InfoBox.propTypes = {
  /**
   * When the specific InfoBox is active, additional css styling is added.
   */
  active: PropTypes.bool,
  /**
   * Signifies if the InfoBox component is for good/bad info and adds css if isRed.
   */
  isRed: PropTypes.bool,
  /**
   * Title of the InfoBox.
   */
  title: PropTypes.string.isRequired,
  /**
   * The number of cases for deaths/recovered/corona cases. (comes as str from the formatting)
   */
  cases: PropTypes.string.isRequired,
  /**
   * The number of total cases for deaths/recovered/corona cases. (comes as str from the formatting)
   */
  total: PropTypes.string.isRequired,
  /**
   * Functition to change the active InfoBox upon user click.
   */
  onClick: PropTypes.func.isRequired,
};

export default InfoBox;
