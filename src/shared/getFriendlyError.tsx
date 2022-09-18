const map: Record<string, string> = {
  '邮件地址格式不正确': '邮箱格式不正确'
};
export const getFriendlyError = (error: string) => {
  // console.log(error);
  return map[error] || error;
};