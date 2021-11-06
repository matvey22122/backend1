import { Router } from "express"
import config from "config"
import { nanoid } from "nanoid"

import Url from "./modelUrl"

const router = Router()

router.post("/shorten", async (req, res) => {
  try {
    const { urlToShorten } = req.body
    const id = nanoid(10)
    const baseUrl = config.get("baseUrl")

    const url = new Url({
      url: urlToShorten,
      uuid: id,
    })

    await url.save()

    res
      .status(201)
      .json({ status: "Created", shortenedUrl: `${baseUrl}/${id}` })
  } catch (e) {
    res.status(500)
  }
})

router.get("/:url", async (req, res) => {
  try {
    const url = await Url.findOne({ uuid: req.params.url })

    if (url) {
      url.views++
      await url.save()
      return res.redirect(url.url)
    }

    res.status(404)
  } catch (e) {
    res.status(500)
  }
})

router.get("/:url/views", async (req, res) => {
  try {
    const url = await Url.findOne({ uuid: req.params.url })

    if (url) {
      res.status(200).json({ viewCount: url.views })
    }

    res.status(404)
  } catch (e) {
    res.status(500)
  }
})

export default router
