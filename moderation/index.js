const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const { id, content, postId } = data;
        const status = content.includes('orange') ? 'rejected' : 'approved';

        axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id,
                content,
                postId,
                status
            }
        })
    }

    res.send({});
})

app.listen(4003, () => {
    console.log('Listening on port 4003');
})