import { Card, CardBody, CardHeader, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";


const Feed = ({ posts, postTypes, setAfter }) => {

    const [ind, setInd] = useState(0);


    const incr = () => {
        if (ind == posts.length - 1) {
            setAfter();
        } else {
            setInd(ind + 1);
        }
    }

    useEffect(() => {

        const keyHandler = ({ key }) => {
            if (key === 'ArrowRight') {
                incr();
            } else if (key === 'ArrowLeft' && ind > 0) {
                setInd(ind - 1);
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => {
            window.removeEventListener("keydown", keyHandler);
        };
    });

    const isImg = () => postTypes[ind] === 'img';
    const isIframe = () => {
        if (postTypes[ind] === 'iframe') {
            if (posts[ind]['url_overridden_by_dest'].includes('imgur') || posts[ind]['is_gallery']) {
                incr();
                return false;
            }
            return true;
        }
        return false;
    }
    const isText = () => postTypes[ind] === 'text';


    return (
        <>
            <HStack>
                {/* <button className="feed-nav-btn">PRV</button> */}
                <VStack>
                    <Card>
                        <CardHeader>
                        {/* new DOMParser().parseFromString(posts[ind].title, "text/xml") */}
                            <a href={`https://reddit.com${posts[ind]['permalink']}`} target='_blank'>
                                <Heading>{posts[ind].title}</Heading>
                            </a>
                        </CardHeader>
                        <CardBody>
                            {/* <Text dangerouslySetInnerHTML={{__html: post.selftext_html}} /> */}
                            {isImg() && <img className="feed-img" src={posts[ind]['url_overridden_by_dest']}></img>}
                            {isIframe() && <iframe className="feed-iframe" src={posts[ind]['url_overridden_by_dest']}></iframe>}
                            {isText() && <TextPost post={posts[ind]} />}                        </CardBody>
                    </Card>

                </VStack>
                {/* <button className="feed-nav-btn">NXT</button> */}
            </HStack>
        </>
    )
}


export default Feed;



const TextPost = ({ post }) => {

    {/* <Text dangerouslySetInnerHTML={{__html: post.selftext_html}} /> */ }

    return (
        < Text > {post.selftext}</Text >
    )
}