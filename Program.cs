using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.Extensions.DependencyInjection.Extensions;
using WFLib;
using WFBlazorLib;
using System.Net;
using WFBlazorLib.Pages;
using WFBlazorServer;
using System.Collections.Generic;
using WFLib.Network;
using static WFLib.Global;
using Microsoft.Extensions.Hosting;

Directories.SetNearApp("Data");
bool isWebServer = true;
isWebServer = false;
var appConfig = GetAppConfig();
TunnelClient client = null;
TunnelServer server = null;

if (isWebServer)
{
    Log("Web Server Mode");
    IPEndPoint wbEP = new IPEndPoint(IPAddress.Loopback, 8080);
    IPEndPoint wbTunnelEP = new IPEndPoint(IPAddress.Loopback, 1111);
    IPAddress remoteAddress = IPAddress.Parse("98.255.170.226");
    remoteAddress = IPAddress.Loopback;
    server = new TunnelServer(wbTunnelEP, wbEP, remoteAddress);
    Task.Run(() => server.Start());
    MenuData.AddMenuItem<WFBlazorServer.Pages.Index>("Home", true);
    MenuData.AddMenuItem<WFTestRecordGridPage>("Test Record Grid");
    MenuData.AddMenuItem<WFStatsPage>("Server Stats");
}
else
{
    Log("Local Server Mode");
    IPEndPoint wsEP = new IPEndPoint(IPAddress.Loopback, 14999);
    //IPEndPoint wsTunneleEP = new IPEndPoint(IPAddress.Parse("74.208.104.179"), 1111);
    IPEndPoint wsTunneleEP = new IPEndPoint(IPAddress.Loopback, 1111);
    client = new TunnelClient(wsTunneleEP, wsEP);
    Task.Run(() => client.Start());
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
    if (isWebServer)
    {
        //this is the version exported to the web
        serverOptions.Listen(IPAddress.Loopback, 15000);
    }
    else
    {
        serverOptions.Listen(IPAddress.Loopback, 14999);
        serverOptions.Listen(IPAddress.Any, 14999);
        //this version is for local testing
        //serverOptions.Listen(IPAddress.Loopback, 14999, listenOptions => 
        //{
        //    listenOptions.UseHttps("../certs/certificate.pfx", "Badtothebone99");
        //});
        //serverOptions.Listen(IPAddress.Any, 14999, listenOptions =>
        //{
        //    listenOptions.UseHttps("../certs/certificate.pfx", "Badtothebone99");
        //});
    }
});
builder.Services.AddHostFiltering(options =>
{
    options.AllowedHosts.Clear();
    options.AllowedHosts.Add("www.wamfish.com");
    options.AllowedHosts.Add("dev.wamfish.com");
    options.AllowedHosts.Add("localhost");
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
app.Lifetime.ApplicationStopped.Register(() =>
{
    Console.WriteLine("Application is shut down");
    if (isWebServer)
    {
        server.Stop();
    }
    else
    {
        client.Stop();
    }
});

if (!isWebServer) app.UseIPFilter("74.208.104.179");

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
//var myhtml = app.Services.GetRequiredService<Html>();
//app.MapGet("/game", myhtml.HtmlTest);

app.Run();