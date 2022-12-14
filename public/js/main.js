function onSubmit(e) {
  e.preventDefault();

  // initially set message and image to empty
  document.querySelector('.msg').textContent = '';
  const imgs = document.querySelectorAll('.single-image');

  // remove images on next search
  imgs.forEach((element) => {
    element.remove();
  });

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;
  const number = document.querySelector('#number').value;

  if (prompt === '') {
    alert('Please add some text!');
    return;
  }

  generateImageRequest(prompt, size, number);
}

async function generateImageRequest(prompt, size, number) {
  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
        number,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    // console.log('DATA ::: ', data);

    // const imageUrl = data.data.imageUrl;

    const imageUrls = data.data.imageUrls;

    imageUrls.forEach(function (imageUrl) {
      const img = document.createElement('img');
      img.classList.add('single-image');
      img.src = imageUrl.url;
      document.querySelector('.image-container').appendChild(img);
    });

    // set the image url from the response
    // document.querySelector('#image').src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

// Show spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

// Remove spinner
function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
