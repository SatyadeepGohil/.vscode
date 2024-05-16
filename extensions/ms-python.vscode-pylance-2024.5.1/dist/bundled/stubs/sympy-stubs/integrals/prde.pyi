from typing import Any, Literal
from sympy.polys.polymatrix import PolyMatrix
from sympy.series.order import Order

zeros = ...
eye = ...
def prde_normal_denom(fa, fd, G, DE) -> tuple[Any, tuple[Any, Any], list[Any], Any]:
    ...

def real_imag(ba, bd, gen) -> tuple[Any, Any, Any]:
    ...

def prde_special_denom(a, ba, bd, G, DE, case=...) -> tuple[Any, Any, Any, Any] | tuple[Any, Any, list[Any], Any]:
    ...

def prde_linear_constraints(a, b, G, DE) -> tuple[Any, PolyMatrix]:
    ...

def poly_linear_constraints(p, d) -> tuple[Any, PolyMatrix]:
    ...

def constant_system(A, u, DE) -> tuple[Any, Any]:
    ...

def prde_spde(a, b, Q, n, DE) -> tuple[Any, Any, list[Any], list[Any], Any]:
    ...

def prde_no_cancel_b_large(b, Q, n, DE) -> tuple[list[Any], Any]:
    ...

def prde_no_cancel_b_small(b, Q, n, DE) -> tuple[list[Any], Any] | tuple[list[Any], PolyMatrix | Any]:
    ...

def prde_cancel_liouvillian(b, Q, n, DE) -> tuple[list[Any], Any]:
    ...

def param_poly_rischDE(a, b, q, n, DE) -> tuple[list[Any], PolyMatrix] | tuple[list[Any], Any] | tuple[list[Any], PolyMatrix | Any]:
    ...

def param_rischDE(fa, fd, G, DE) -> tuple[list[Any], PolyMatrix]:
    ...

def limited_integrate_reduce(fa, fd, G, DE) -> tuple[Any, Any, Any, Any, Any, list[Any]]:
    ...

def limited_integrate(fa, fd, G, DE) -> tuple[tuple[Any, Any], list[Any]] | None:
    ...

def parametric_log_deriv_heu(fa, fd, wa, wd, DE, c1=...) -> tuple[Any, Any, Any | Order] | None:
    ...

def parametric_log_deriv(fa, fd, wa, wd, DE) -> tuple[Any, Any, Any | Order] | None:
    ...

def is_deriv_k(fa, fd, DE) -> tuple[list[tuple[Any, Any]], Any | Order, Any] | None:
    ...

def is_log_deriv_k_t_radical(fa, fd, DE, Df=...) -> tuple[list[tuple[Any, Any]], Any | Order, Any | Literal[0], Any] | None:
    ...

def is_log_deriv_k_t_radical_in_field(fa, fd, DE, case=..., z=...) -> tuple[Any | int, Any | Order] | tuple[Any | int, Any] | None:
    ...
