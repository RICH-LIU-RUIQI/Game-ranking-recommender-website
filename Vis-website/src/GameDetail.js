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

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
        marginTop: 15,
        borderRadius: spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        position: 'relative',
        maxWidth: 500,
        marginLeft: 20,
        marginRight: 'auto',
        overflow: 'initial',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: spacing(2),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
            paddingTop: spacing(2),
        },
    },
    media: {
        width: '100%',
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

export const BlogCardDemo = React.memo(function BlogCard() {
    const message = 'shooter, multiplayer, FPS';
    const styles = useStyles();
    const {
        button: buttonStyles,
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();
    return (
        <Card className={cx(styles.root, shadowStyles.root)}>
            <CardMedia
                className={styles.media}
                image={
                    'https://cdn.cloudflare.steamstatic.com/steam/apps/730/ss_118cb022b9a43f70d2e5a2df7427f29088b6b191.jpg?t=1668125812'
                }
            />
            <CardContent>
                {/*<TextInfoContent*/}
                {/*    classes={contentStyles}*/}
                {/*    overline={'Free'}*/}
                {/*    heading={'Counter-Strike: Global Offensive'}*/}
                {/*    body={*/}
                {/*        message.substring(0, 50 || message.length)*/}
                {/*    }*/}
                {/*/>*/}
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minHeight: 120}}>
                    <span>Free</span>
                    <h2>Counter-Strike: Global Offensive</h2>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10}}>
                        <Chip label="shooter" color="primary" size='small' />
                        <Chip label="multiplayer" color="primary" size='small' />
                        <Chip label="FPS" color="primary" size='small' />
                    </div>
                </div>
                <Button style={{marginTop: 30, backgroundColor: 'gray'}}>
                    <a href='https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/'
                        style={{textDecoration: 'none', color: 'white', fontFamily: 'fantasy', fontSize: 'large'}}
                    >
                        Read more
                    </a>

                </Button>
            </CardContent>
        </Card>
    );
});

export default BlogCardDemo