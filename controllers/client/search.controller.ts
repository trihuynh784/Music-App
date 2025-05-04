import { Request, Response } from "express";
import { formatDuration, getDurationFromUrl } from "../../helpers/song";
import { convertToSlug } from "../../helpers/convertToSlug";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /search/:typeSearch
export const index = async (req: Request, res: Response) => {
  const typeSearch = req.params.typeSearch;
  const initKeyword = req.query.keyword;
  const keyword: string = convertToSlug(req.query.keyword.toString().trim());
  let newSongs = [];

  if (keyword) {
    const songs = await Song.find({
      slug: new RegExp(keyword, "i"),
      deleted: false,
    });

    for (const song of songs) {
      const singer = await Singer.findById(song.singerId);

      const secondDuration = await getDurationFromUrl(song.audio);
      const durationFormated = formatDuration(secondDuration);

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
};
