
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Net.Mime;


[Route("api/[getAllroutes]")]
[ApiController]
public class routeController : ControllerBase
{
  /// <summary>
  /// Obtiene todas las rutas.
  /// </summary>
  /// <returns>Objeto que representa las rutas.</returns>

  /// <response code="200">Resultado procesado correctamente</response>
  /// <response code="400">Petición incorrecta</response>
  /// <response code="401">No autorizado</response>
  /// <response code="403">Acceso denegado</response>

  [HttpGet]

  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  [ProducesResponseType(StatusCodes.Status403Forbidden)]

  [Produces(MediaTypeNames.Application.Json)]
  public ActionResult<object> Get()
  {
    return ruta;
  }
}





