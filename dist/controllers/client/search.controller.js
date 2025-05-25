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
exports.index = void 0;
const song_1 = require("../../helpers/song");
const convertToSlug_1 = require("../../helpers/convertToSlug");
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const typeSearch = req.params.typeSearch;
    const initKeyword = req.query.keyword;
    const keyword = (0, convertToSlug_1.convertToSlug)(req.query.keyword.toString().trim());
    let newSongs = [];
    if (keyword) {
        const songs = yield song_model_1.default.find({
            slug: new RegExp(keyword, "i"),
            deleted: false,
        });
        for (const song of songs) {
            const singer = yield singer_model_1.default.findById(song.singerId);
            const secondDuration = yield (0, song_1.getDurationFromUrl)(song.audio);
            const durationFormated = (0, song_1.formatDuration)(secondDuration);
            newSongs.push({
                title: song.title,
                avatar: song.avatar,
                slug: song.slug,
                duration: durationFormated,
                infoSinger: {
                    fullName: singer.fullName,
                },
            });
        }
    }
    switch (typeSearch) {
        case "result":
            res.render("client/pages/search/result", {
                titlePage: `Kết quả tìm kiếm của: ${initKeyword}`,
                keyword: initKeyword,
                songs: newSongs,
            });
            break;
        case "suggestions":
            res.status(200).json({
                code: 200,
                message: "success",
                songs: newSongs,
            });
            break;
        default:
            break;
    }
});
exports.index = index;
