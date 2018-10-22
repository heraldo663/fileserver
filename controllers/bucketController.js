const { Bucket } = require("../models");

module.exports = {
  async getBuckets(req, res) {
    try {
      const buckets = await Bucket.findAll({
        where: {
          userId: req.user.id,
          rootBucketId: null
        }
      });

      return res.json(buckets);
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  },
  async getBucket(req, res) {
    try {
      const buckets = await Bucket.findAll({
        where: {
          userId: req.user.id,
          rootBucketId: req.params.id
        }
      });

      return res.json(buckets);
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  },
  async createBucket(req, res) {
    try {
      const newBucket = {
        bucket: req.body.bucket,
        rootBucketId: req.body.bucketId || null,
        userId: req.user.id
      };
      const bucket = await Bucket.create(newBucket);
      return res.json(bucket);
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  },
  async patchBucket(req, res) {
    try {
      let bucketModel = await Bucket.findOne({ id: req.params.id });
      const { bucket } = req.body;
      if (bucket) {
        const updatedBucket = await bucketModel.update({
          bucket
        });
        return res.json(updatedBucket);
      }
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  },

  async deleteBucket(req, res) {
    try {
      const bucket = await Bucket.findById(req.params.id);
      bucket.destroy();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  }
};