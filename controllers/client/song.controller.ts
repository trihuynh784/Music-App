import { Request, Response } from "express";
import { formatDuration, getDurationFromUrl } from "../../helpers/song";
import Singer from "../../models/singer.model";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import User from "../../models/user.model";

// [GET] /songs/:slugList
export const list = async (req: Request, res: Response) => {
  const slug: string = req.params.slug;

  const topic = await Topic.findOne({
    slug: slug,
    status: "active",
    deleted: false,
  });

  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false,
  });

  for (const song of songs) {
    if (!song.singerId || !song.audio) continue;
    const singer = await Singer.findById(song.singerId);
    const second = await getDurationFromUrl(song.audio);

    song["duration"] = formatDuration(second);
    song["infoSinger"] = singer;

    if (res.locals.user && res.locals.user.favoritesList.length > 0) {
      song["liked"] = res.locals.user.favoritesList.includes(song.id);
    }
  }

  res.render("client/pages/songs/list", {
    titlePage: topic.title,
    songs: songs,
  });
};

// [GET] /songs/detail/:slugSong
export const songDetail = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    const song = await Song.findOne({ slug: slug });
    const topic = await Topic.findById(song.topicId).select("title");
    const singer = await Singer.findById(song.singerId).select(
      "fullName avatar"
    );
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
  } catch (error) {
    res.render("client/pages/errors/404");
  }
};

// [GET] /songs/:type/:status/:slugSong
export const like = async (req: Request, res: Response) => {
  try {
    const type = req.params.type;
    const slugSong: string = req.params.slugSong;
    const status: string = req.params.status;

    const song = await Song.findOne({ slug: slugSong });

    const newLike: number = song.like + (status == "add" ? 1 : -1);

    switch (type) {
      case "like":
        if (status == "add") {
          // Check liked user
          const isLiked = await Song.findOne({
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

          await Song.updateOne(
            { _id: song.id },
            { $push: { usersLiked: res.locals.user.id }, like: newLike }
          );
        } else {
          await Song.updateOne(
            { _id: song.id },
            { $pull: { usersLiked: res.locals.user.id }, like: newLike }
          );
        }
      case "favorite":
        if (status == "add") {
          // Check is exist song in favoritesList
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

          await User.updateOne(
            { _id: res.locals.user.id },
            { $push: { favoritesList: song.id } }
          );
        } else {
          await User.updateOne(
            { _id: res.locals.user.id },
            { $pull: { favoritesList: song.id } }
          );
        }

      default:
        break;
    }

    res.json({
      code: 200,
      message: "success",
      like: newLike,
    });
  } catch (error) {
    res.json({
      code: 404,
    });
  }
};

// [GET] /songs/listen/:songSlug
export const listen = async (req: Request, res: Response) => {
  try {
    const songSlug = req.params.songSlug;

    const song = await Song.findOne({ slug: songSlug });

    await Song.updateOne(
      { slug: songSlug },
      {
        listen: song.listen + 1,
      }
    );

    const newSong = await Song.findOne({ slug: songSlug });

    res.json({
      code: 200,
      message: "success",
      listen: newSong.listen,
    });
  } catch (error) {
    res.json({
      code: 404,
    });
  }
};
