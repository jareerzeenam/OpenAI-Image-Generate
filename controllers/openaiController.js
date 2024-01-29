const { OpenAI } = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const generateImage = async (req, res) => {
  const { prompt, size, number } = req.body;

  const imageSize =
    size === 'small'
      ? '256x256'
      : size === 'medium'
      ? '512x512'
      : '1024x1024';

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: parseInt(number) || 1,
      size: imageSize,
    });

    // console.log('DATA', response.data.data);

    // const imageUrl = response.data.data[0].url;
    const imageUrls = response.data.data;

    res.status(200).json({
      success: true,
      data: {
        // imageUrl,
        imageUrls,
      },
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

module.exports = { generateImage };
