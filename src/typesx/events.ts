declare namespace Revite {

  namespace Events {

    type EventConstructor = Revite.Constructor<Revite.Event, any>
    type ListenerConstructor = Revite.Constructor<Revite.Listener, void>
  }
}
