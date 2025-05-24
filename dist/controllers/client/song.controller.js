"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.like = exports.songDetail = exports.list = void 0;
const song_1 = require("../../helpers/song");
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const topic = yield topic_model_1.default.findOne({
        slug: slug,
        status: "active",
        deleted: false,
    });
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        status: "active",
        deleted: false,
    });
    for (const song of songs) {
        if (!song.singerId || !song.audio)
            continue;
        const singer = yield singer_model_1.default.findById(song.singerId);
        const second = yield (0, song_1.getDurationFromUrl)(song.audio);
        song["duration"] = (0, song_1.formatDuration)(second);
        song["infoSinger"] = singer;
        if (res.locals.user && res.locals.user.favoritesList.length > 0) {
            song["liked"] = res.locals.user.favoritesList.includes(song.id);
        }
    }
    res.render("client/pages/songs/list", {
        titlePage: topic.title,
        songs: songs,
    });
});
exports.list = list;
const songDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const song = yield song_model_1.default.findOne({ slug: slug });
        const topic = yield topic_model_1.default.findById(song.topicId).select("title");
        const singer = yield singer_model_1.default.findById(song.singerId).select("fullName avatar");
        song["infoSinger"] = singer;
        song["infoTopic"] = topic;
        if (res.locals.user) {
            song["liked"] = song.usersLiked.includes(res.locals.user.id);
            song["favorited"] = res.locals.user.favoritesList.includes(song.id);
        }
        res.render("client/pages/songs/detail", {
            titlePage: "Chi tiết bài hát",
            song: song,
        });
    }
    catch (error) {
        res.render("client/pages/errors/404");
    }
});
exports.songDetail = songDetail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.params.type;
        const slugSong = req.params.slugSong;
        const status = req.params.status;
        const song = yield song_model_1.default.findOne({ slug: slugSong });
        const newLike = song.like + (status == "add" ? 1 : -1);
        switch (type) {
            case "like":
                if (status == "add") {
                    const isLiked = yield song_model_1.default.findOne({
                        slug: slugSong,
                        usersLiked: res.locals.user.id,
                    });
                    if (isLiked) {
                        res.json({
                            code: 400,
                            message: "liked",
                        });
                        return;
                    }
                    yield song_model_1.default.updateOne({ _id: song.id }, { $push: { usersLiked: res.locals.user.id }, like: newLike });
                }
                else {
                    yield song_model_1.default.updateOne({ _id: song.id }, { $pull: { usersLiked: res.locals.user.id }, like: newLike });
                }
            case "favorite":
                if (status == "add") {
                    if (res.locals.user.favoritesList) {
                        const isFavorited = res.locals.user.favoritesList.includes(song.id);
                        if (isFavorited) {
                            res.json({
                                code: 400,
                                message: "favorited",
                            });
                            return;
                        }
                    }
                    yield user_model_1.default.updateOne({ _id: res.locals.user.id }, { $push: { favoritesList: song.id } });
                }
                else {
                    yield user_model_1.default.updateOne({ _id: res.locals.user.id }, { $pull: { favoritesList: song.id } });
                }
            default:
                break;
        }
        res.json({
            code: 200,
            message: "success",
            like: newLike,
        });
    }
    catch (error) {
        res.json({
            code: 404,
        });
    }
});
exports.like = like;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songSlug = req.params.songSlug;
        const song = yield song_model_1.default.findOne({ slug: songSlug });
        yield song_model_1.default.updateOne({ slug: songSlug }, {
            listen: song.listen + 1,
        });
        const newSong = yield song_model_1.default.findOne({ slug: songSlug });
        res.json({
            code: 200,
            message: "success",
            listen: newSong.listen,
        });
    }
    catch (error) {
        res.json({
            code: 404,
        });
    }
});
exports.listen = listen;
