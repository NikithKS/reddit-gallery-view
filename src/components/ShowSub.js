import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import Feed from "./Feed";
import ShowMessage from "./ShowMessage";


const ShowSub = ({ subInfo }) => {

    const [state, setState] = useState({ isLoading: true, data: null, isErr: false, hasData: false, err: '' });
    const [curAfter, setCurAfter] = useState('');


    const handleData = (res) => {
        // console.log(res);
        if (res.status != 200) {
            res.json().then((res) => {
                setState({ ...state, isLoading: false, data: res, isErr: true, hasData: false, err: `Status ${res.error}, ${res.message}` });
            });
        } else {
            res.json().then((res) => {
                console.log(res);
                tempAfter = res['data']['after'];
                setState({ ...state, isLoading: false, data: res, hasData: true, isErr: false });
            });
        }
    }


    let posts = [];

    const getPosts = () => {
        // console.log(state);
        state.data['data']['children'].map((i) => {
            posts.push(i['data']);
        })
        // console.log(posts);
        return posts;
    }


    const getPostTypes = () => {

        const postTypes = [];

        posts.map((post) => {
            if (post['post_hint'] === 'image') {
                if (post['is_gallery'])
                    postTypes.push('iframe');
                else
                    postTypes.push('img');
            }
            else if (post['post_hint'] === 'rich:video')
                postTypes.push('iframe');
            else if (post['post_hint'] === 'link')
                postTypes.push('iframe');
            else if (post['is_self'] || post['post_hint'] === 'self')
                postTypes.push('text');
            else {
                if (post['url_overridden_by_dest'] !== null)
                    postTypes.push('iframe');
                else
                    postTypes.push(`unknown ${post.author_fullname}`);
            }
        })
        // console.log(posts);
        return postTypes;
    }


    useEffect(() => {
        let url = `https://reddit.com/r/${subInfo.sub}/${subInfo.sort}.json?after=${curAfter}`
        console.log(url);

        fetch(url)
            // fetch(`https://reddit.com/r/webdev.json`)
            .then((body) => handleData(body))
            .catch((err) => console.log(err));
    }, [curAfter]);


    useEffect(() => {
        let url = `https://reddit.com/r/${subInfo.sub}/${subInfo.sort}.json`
        console.log(url);

        fetch(url)
            // fetch(`https://reddit.com/r/webdev.json`)
            .then((body) => handleData(body))
            .catch((err) => console.log(err));
    }, [subInfo]);

    return (
        <>
            {state.isLoading && <Spinner size='xl' />}
            {state.isErr && <ShowMessage msg={`Unable to access subreddit. Recheck if entered name is correct. Received: ${state.err}`} />}
            {state.hasData && <Feed key={state.data['data']['after']} posts={getPosts()} postTypes={getPostTypes()} setAfter={() => setCurAfter(state.data['data']['after'])} />}
        </>
    )
}



export default ShowSub;