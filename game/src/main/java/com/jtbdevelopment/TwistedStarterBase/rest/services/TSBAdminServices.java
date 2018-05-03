package com.jtbdevelopment.TwistedStarterBase.rest.services;

import com.jtbdevelopment.games.dao.AbstractGameRepository;
import com.jtbdevelopment.games.dao.AbstractPlayerRepository;
import com.jtbdevelopment.games.dao.StringToIDConverter;
import com.jtbdevelopment.games.rest.services.AbstractAdminServices;
import org.springframework.stereotype.Component;

/**
 * Date: 11/27/2014
 * Time: 6:34 PM
 */
@SuppressWarnings("unused")
@Component
public class TSBAdminServices extends AbstractAdminServices {
    public TSBAdminServices(
            final AbstractPlayerRepository playerRepository,
            final AbstractGameRepository gameRepository,
            final StringToIDConverter stringToIDConverter) {
        super(playerRepository, gameRepository, stringToIDConverter);
    }
}
