export const handleAddCard = (element: any) => {
  element((prevCount: number) => prevCount + 1);
};

export const handleTextareaInput = (event: any, hookVar: any) => {
  const element = event.target;
  element.style.height = "30px";
  element.style.height = `${element.scrollHeight}px`;
  hookVar(`${element.scrollHeight}px`);
};
