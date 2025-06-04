package org.iesbelen.nightmarebox.dto;


import lombok.Data;
import org.iesbelen.nightmarebox.domain.Director;
import org.iesbelen.nightmarebox.domain.SubGenero;

import java.time.Year;
import java.util.Set;

@Data
public class PeliculaMediaValoracionDTO {
    private Long id;
    private String titulo;
    private Year year;
    private Integer duracion;
    private String sinopsis;
    private Boolean premio;
    private String poster;
    private Set<String> paises;
    private Director director;
    private SubGenero subGenero;
    private Double mediaValoracion;
}

