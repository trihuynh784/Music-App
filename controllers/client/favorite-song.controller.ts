import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { formatDuration, getDurationFromUrl } from "../../helpers/song";

export const index = async (req: Request, res: Response) => {
  try {
    let songs = [];
    for (const songId of res.locals.user.favoritesList) {
      const song = await Song.findById(songId);
      const singer = await Singer.findById(song.singerId);

      const second = await getDurationFromUrl(song.audio);
      song["duration"] = formatDuration(second);

      song["infoSinger"] = singer;

      song["liked"] = res.locals.user.favoritesList.includes(song.id);

      songs.push(song);
    }

    res.render("client/pages/favorite-song/index", {
      titlePage: "Danh sách bài hát yêu thích",
      songs: songs,
    });
  } catch (error) {
    req.flash("error", "Không tìm thấy yêu cầu!");
    res.render("client/pages/errors/404");
  }
};
