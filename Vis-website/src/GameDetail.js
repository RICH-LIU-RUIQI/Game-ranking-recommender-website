import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import {Chip} from "@material-ui/core";
import './styles/GameCard.css';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
        marginTop: 15,
        borderRadius: spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        position: 'relative',
        width: '77%',
        margin: '0 auto',
        overflow: 'initial',
        background: '#d0caca',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: spacing(2),
        [breakpoints.up('md')]: {
            paddingTop: spacing(2),
        },
    },
    media: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: spacing(-1),
        height: 0,
        paddingBottom: '48%',
        borderRadius: spacing(2),
        backgroundColor: '#fff',
        position: 'relative',
        [breakpoints.up('md')]: {
            width: '100%',
            marginLeft: spacing(-3),
            marginTop: 0,
            transform: 'translateX(-8px)',
        },
        '&:after': {
            content: '" "',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            // backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
            borderRadius: spacing(2), // 16
            opacity: 0.5,
        },
    },
    content: {
        padding: 24,
    },
    cta: {
        marginTop: 24,
        textTransform: 'initial',
    },
}));

export const BlogCardDemo = React.memo(function BlogCard(props) {
    const styles = useStyles();
    const {
        button: buttonStyles,
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();
    const arrCate = props.details.categories.split(" ").slice(0, 3);
    return (
        <Card className={cx(styles.root, shadowStyles.root)}>
            <CardMedia
                className={styles.media}
                image={props.details.header_image}
            />
            <div id='card-container' >
                <h2>{props.details.price}</h2>
                <video src={props.details.movie} autoPlay={true} controls={true} loop={false} />
            </div>
            <Button style={{marginTop: 20, backgroundColor: '#325288'}}>
                <a href={'https://store.steampowered.com/app/' + props.details.appid.toString()}  // props.details.url
                id='game-link'>
                    Learn more
                </a>
            </Button>
        </Card>
    );
});

export default BlogCardDemo