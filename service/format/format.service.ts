class FormatService {
  truncateText(text: string, len: number) {
    if (text.length <= len) {
      return text;
    }

    text = text.slice(0, len) + "...";

    return text;
  }
}

export default FormatService;
