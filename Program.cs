using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.Extensions.DependencyInjection.Extensions;
using WFLib;
using WFBlazorLib;
using System.Net;
using WFBlazorLib.Pages;
using WFBlazorServer;

Directories.SetNearApp("Data");
bool isWebServer = false;
var appConfig = GetAppConfig();
if (isWebServer)
{
    MenuData.AddMenuItem<WFBlazorServer.Pages.Index>("Home", true);
    MenuData.AddMenuItem<WFTestRecordGridPage>("Test Record Grid");
    MenuData.AddMenuItem<WFStatsPage>("Server Stats");
}
else
{
    MenuData.AddMenuItem<WFBlazorServer.Pages.Index>("Home", true);
    MenuData.AddMenuItem<WFBlogEditor>("Blog");
    MenuData.AddMenuItem<WFTestRecordGridPage>("Test Record Grid");
    MenuData.AddMenuItem<WFUserPage>("User Edit");
    MenuData.AddMenuItem<WFStatsPage>("Server Stats");
    MenuData.AddMenuItem<CSSPad>("CSS Pad");
    MenuData.AddMenuItem<LinksPage>("Edit Links");
    MenuData.AddMenuItem<ChannelPage>("Edit Channels");
    MenuData.AddMenuItem<UtilsPage>("Utils");
}

WebApplicationBuilder builder;
builder = WebApplication.CreateBuilder(args);


builder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
    serverOptions.Listen(IPAddress.Loopback, 15000);
    //serverOptions.Listen(IPAddress.Loopback, 15001, listenOptions =>
    //{
    //    listenOptions.UseHttps("testCert.pfx", "testPassword");
    //});
});

builder.Logging.ClearProviders();
builder.Logging.AddWFLogger();

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddScoped<UserLoginService>();
builder.Services.TryAddEnumerable(ServiceDescriptor.Scoped<CircuitHandler, UserCircuitHandler>());
builder.Services.AddHttpClient();
// stuff needed when using the Html class. lets leave it commented out for now.
// We need a physical file provider to read files from the server's folder
var physicalProvider = builder.Environment.ContentRootFileProvider;
builder.Services.AddSingleton(physicalProvider);
builder.Services.AddSingleton<Html>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    // Note: It seems important to understand how this can effect your server. I do not as of now, so I am leaving it commented out.
    //app.UseHsts();
}
//app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

// playing around with a custom minimal api static html class
var myhtml = app.Services.GetRequiredService<Html>();
app.MapGet("/game", myhtml.HtmlTest);

app.Run();