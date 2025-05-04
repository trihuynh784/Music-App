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
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const song_1 = require("../../helpers/song");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let songs = [];
        for (const songId of res.locals.user.favoritesList) {
            const song = yield song_model_1.default.findById(songId);
            const singer = yield singer_model_1.default.findById(song.singerId);
            const second = yield (0, song_1.getDurationFromUrl)(song.audio);
            song["duration"] = (0, song_1.formatDuration)(second);
            song["infoSinger"] = singer;
            song["liked"] = res.locals.user.favoritesList.includes(song.id);
            songs.push(song);
        }
        res.render("client/pages/favorite-song/index", {
            titlePage: "Danh sách bài hát yêu thích",
            songs: songs,
        });
    }
    catch (error) {
        req.flash("error", "Không tìm thấy yêu cầu!");
        res.render("client/pages/errors/404");
    }
});
exports.index = index;
