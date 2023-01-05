import { Analyzer } from './crawler'; // if you don't exprt default, use curly brackets

// for the seek of import
export default class LeeAnalyzer implements Analyzer {
  public analyze(html: string, filePath: string) {
    return html;
  }
}
