window.__convertWebpFromContext = function (url, format) {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((convertedBlob) => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(convertedBlob);
            a.download = `converted.${format === "image/png" ? "png" : "jpg"}`;
            a.click();
          }, format, 0.92);
        };
        img.src = URL.createObjectURL(blob);
      });
  };
  