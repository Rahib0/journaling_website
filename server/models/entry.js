let entriesData = require('../data/entries');

class Entry {
    constructor(data) {
        this.id = data.id;
        this.timestamp = data.timestamp;
        this.title = data.title;
        this.body = data.body;
        this.comments = data.comments;
        this.emojis = data.emojis;
    }

    static get all() {
        return entriesData;
    }

    static findById(id) {
        return entriesData.find(entry => entry.id === id);
    }

    static create(data, uid) {
        const timestamp = Date.now();
        const newEntryId = `${uid}${timestamp}`; // entry id consists of user id concatenated with time of entry creation
        const newEntry = new Entry({ 
            id: newEntryId,
            timestamp: timestamp,
            comments: [],
            emojis: {
                likeCount: 0,
                loveCount: 0,
                laughCount: 0
            },
            ...data 
        });
        entriesData.push(newEntry);
    }

    static deleteById(id) {
        entriesData = entriesData.filter((entry) => entry.id !== id);
        return entriesData;
    }

    static getEntriesByPageNumber(pageNum) {
        let startIndex = (pageNum - 1) * 12;
        let entriesForPage = [];

        if (startIndex > entriesData.length) {
            throw 'Given page number exceeds entries array length';
        } else {
            for (let i = 0; i < 12; i++) {
                entriesForPage[i] = entriesData[startIndex];
                startIndex++;
            }
        }
        return entriesForPage;
    }

    static deleteCommentById(commentId, entryId) {
        const entry = entriesData.find(entry => entry.id === entryId);
        if (entry) {
            entry.comments = entry.comments.filter(comment => comment.id != commentId);
        } else {
            throw 'Given entry ID is invalid';
        }
    }
}

module.exports = Entry;