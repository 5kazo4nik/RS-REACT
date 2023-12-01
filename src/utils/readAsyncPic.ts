export async function readAsyncPic(file: File) {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      res(event.target?.result);
    };
    reader.readAsDataURL(file);
  });
}
