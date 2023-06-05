using System.Net.Mime;
using System.Text;
using Microsoft.Extensions.FileProviders;

namespace WFBlazorServer;
/*
    Note: An experiment with producing a html page outside the blazor framework.
    Maybe as a startup splash page, or when godot update version 4 to support 
    web deploy. Experamental for now.
*/

public class Html
{
    static string html = "";
    static DateTimeOffset lastModified = DateTimeOffset.MinValue;
    IFileProvider fp;
    public Html(IFileProvider fp)
    {
        this.fp = fp;
    }
    public Task HtmlTest(HttpContext httpContext)
    {
        var filePath = Path.Combine("html", "htmlpage.html");
        var fileInfo = fp.GetFileInfo(filePath);

        if (fileInfo.LastModified != lastModified)
        {
            lastModified = fileInfo.LastModified;
            using var reader = fileInfo.CreateReadStream();
            using var streamReader = new StreamReader(reader);
            html = streamReader.ReadToEnd();
            Console.WriteLine("Read the page");
        }

        httpContext.Response.ContentType = MediaTypeNames.Text.Html;
        httpContext.Response.ContentLength = Encoding.UTF8.GetByteCount(html);
        return httpContext.Response.WriteAsync(html);
    }
}
