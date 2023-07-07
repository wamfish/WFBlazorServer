using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.Extensions.DependencyInjection.Extensions;
using WFLib;
using WFBlazorLib;

WebApplicationBuilder builder;
builder = WebApplication.CreateBuilder(args);
MyLib.Config.Server(builder);
builder.Logging.ClearProviders();
builder.Logging.AddWFLogger();
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddScoped<UserLoginService>();
builder.Services.TryAddEnumerable(ServiceDescriptor.Scoped<CircuitHandler, UserCircuitHandler>());
builder.Services.AddHttpClient();
var app = builder.Build();
MyLib.Config.App(app);
app.UseHttpLogging();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    // Note: It seems important to understand how this can effect your server. I do not as of now, so I am leaving it commented out.
    //app.UseHsts();
}
// Cloudflare tunnel does https redirection for the local server
// and the web server uses caddy for Let's Encrypt, and https redirection
// This is not needed, but I am leaving it here for reference.
// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");
app.Run();