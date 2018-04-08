package com.jtbdevelopment.TwistedStarterBase.json

import com.fasterxml.jackson.databind.module.SimpleModule
import com.jtbdevelopment.TwistedStarterBase.player.TSBPlayerAttributes
import com.jtbdevelopment.TwistedStarterBase.state.masking.TSBMaskedGame
import com.jtbdevelopment.games.players.GameSpecificPlayerAttributes
import com.jtbdevelopment.games.state.masking.MaskedMultiPlayerGame

/**
 * Date: 7/26/16
 * Time: 11:34 PM
 */
class TSBJacksonRegistrationTest extends GroovyTestCase {
    void testCustomizeModule() {
        TSBJacksonRegistration registration = new TSBJacksonRegistration()
        boolean registeredGameAttributes = false
        boolean registeredMaskedGame = false
        def module = [
                addAbstractTypeMapping: {
                    Class iface, Class impl ->
                        if (GameSpecificPlayerAttributes.class.is(iface)) {
                            assert TSBPlayerAttributes.class.is(impl)
                            registeredGameAttributes = true
                            return null
                        }
                        if (MaskedMultiPlayerGame.class.is(iface)) {
                            assert TSBMaskedGame.class.is(impl)
                            registeredMaskedGame = true
                            return null
                        }
                        fail('unexpected attributes')
                }
        ] as SimpleModule
        registration.customizeModule(module)
        assert registeredGameAttributes
        assert registeredMaskedGame

    }
}
